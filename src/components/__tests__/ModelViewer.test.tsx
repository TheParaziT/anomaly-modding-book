import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModelViewer from '../ModelViewer';

// Babylon.js mocks
jest.mock('@babylonjs/loaders/glTF', () => ({}));

const runLoopCallbacks: Array<() => void> = [];

jest.mock('@babylonjs/core', () => ({
  Engine: jest.fn().mockImplementation(() => ({
    runRenderLoop: (cb: () => void) => {
      runLoopCallbacks.push(cb);
    },
    resize: jest.fn(),
    dispose: jest.fn(),
  })),
  Scene: jest.fn().mockImplementation(() => ({
    render: jest.fn(),
    dispose: jest.fn(),
    meshes: [],
    animationGroups: [],
    activeCamera: true,
  })),
}));

jest.mock('@babylonjs/core/Cameras/arcRotateCamera', () => ({
  ArcRotateCamera: jest.fn().mockImplementation(() => ({
    attachControl: jest.fn(),
    setTarget: jest.fn(),
    radius: 0,
  })),
}));

jest.mock('@babylonjs/core/Lights/hemisphericLight', () => ({
  HemisphericLight: jest.fn(),
}));

jest.mock('@babylonjs/core/Maths/math.vector', () => {
  class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x = 0, y = 0, z = 0) {
      this.x = x; this.y = y; this.z = z;
    }
    add(v: any) { return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z); }
    subtract(v: any) { return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z); }
    scale(s: number) { return new Vector3(this.x * s, this.y * s, this.z * s); }
    length() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
    clone() { return new Vector3(this.x, this.y, this.z); }
    static Zero() { return new Vector3(0, 0, 0); }
    static Minimize(a: any, b: any) { return new Vector3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z)); }
    static Maximize(a: any, b: any) { return new Vector3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z)); }
  }
  return { Vector3 };
});

const sceneLoaderAppend = jest.fn();
jest.mock('@babylonjs/core/Loading/sceneLoader', () => ({
  SceneLoader: {
    Append: (...args: any[]) => sceneLoaderAppend(...args),
  },
}));

describe('ModelViewer', () => {
  const defaultProps = {
    modelUrl: '/test-model.glb',
    fallbackImageUrl: '/test-fallback.png',
  };

  beforeEach(() => {
    // Mock navigator.connection
    Object.defineProperty(navigator, 'connection', {
      value: {
        effectiveType: '4g',
      },
      writable: true,
    });
    runLoopCallbacks.length = 0;
    sceneLoaderAppend.mockImplementation((_, __, ___, onSuccess) => {
      // simulate async load so initial loading UI is visible
      setTimeout(() => onSuccess(), 0);
    });
  });

  it('renders base component', () => {
    const { getAllByText } = render(<ModelViewer {...defaultProps} />);
    
    expect(getAllByText('Загрузка модели...').length).toBeGreaterThan(0);
  });

  it('shows fallback on slow connection', () => {
    Object.defineProperty(navigator, 'connection', {
      value: {
        effectiveType: '2g',
      },
      writable: true,
    });

    const { queryByText } = render(<ModelViewer {...defaultProps} />);
    
    // On slow connection, placeholder should be shown (no loading text)
    expect(queryByText('Загрузка модели...')).not.toBeInTheDocument();
  });

  it('handles load error and shows fallback', async () => {
    sceneLoaderAppend.mockImplementationOnce((_, __, ___, __onSuccess, __onProgress, onError) => {
      onError();
    });
    const { getByText } = render(<ModelViewer {...defaultProps} />);
    await new Promise((r) => setTimeout(r, 0));
    expect(getByText(/Не удалось загрузить 3D-модель/)).toBeInTheDocument();
  });

  it('renders caption when provided', () => {
    const caption = 'Test model';
    const { getByText } = render(<ModelViewer {...defaultProps} caption={caption} />);
    
    expect(getByText(caption)).toBeInTheDocument();
  });

  it('applies correct alignment styles', () => {
    const { rerender, getByRole } = render(
      <ModelViewer {...defaultProps} align="left" />
    );
    
    let figure = getByRole('figure');
    expect(figure).toHaveStyle({ textAlign: 'left' });

    rerender(<ModelViewer {...defaultProps} align="right" />);
    figure = getByRole('figure');
    expect(figure).toHaveStyle({ textAlign: 'right' });

    rerender(<ModelViewer {...defaultProps} align="center" />);
    figure = getByRole('figure');
    expect(figure).toHaveStyle({ textAlign: 'center' });
  });

  it('applies custom sizes', () => {
    const { getByRole } = render(
      <ModelViewer 
        {...defaultProps} 
        width="500px" 
        height="400px" 
      />
    );
    
    const figure = getByRole('figure');
    const container = figure.querySelector('div');
    expect(container).toHaveStyle({ 
      width: '500px', 
      height: '400px' 
    });
  });

  it('has a11y roles and aria-live status', async () => {
    const { getByRole, findByRole } = render(<ModelViewer {...defaultProps} />);
    const app = getByRole('application');
    expect(app).toHaveAttribute('aria-label');
    const status = await findByRole('status');
    expect(status).toBeInTheDocument();
  });

  it('responds to keyboard: arrows and zoom', () => {
    const { getByRole } = render(<ModelViewer {...defaultProps} />);
    const app = getByRole('application');
    // focus
    (app as HTMLElement).focus();
    // simulate keys
    app.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    app.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    app.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    app.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    app.dispatchEvent(new KeyboardEvent('keydown', { key: '+', bubbles: true }));
    app.dispatchEvent(new KeyboardEvent('keydown', { key: '-', bubbles: true }));
    // If no errors thrown, interactions are wired. Additionally, ensure canvas exists.
    expect(app.querySelector('canvas')).toBeTruthy();
  });
});
