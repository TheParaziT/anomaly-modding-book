---
tags:
    - Blender
draft: true
---

# Creating Cubemap in Blender

___

<Authors
  authors={["theparazit"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## About

In X-Ray, cubmaps are used for Sky Box and for reflective surfaces (mirrors, glass).

:::tip
Cubmaps can be created in different ways (addons, procedural textures or HDRi maps) and in different programs.
:::

:::info
In X-rays, Сubemaps are based on six projections arranged in a specific order, where:

![alt text centered](assets/images/cubemap-coordinates.png)
:::

:::info
They may look different in the view of different programs

In the `Gimp` view, it might look like this (texture with six layers)

![Cubemap Example](assets/images/cubemap-gimp-example.png)

In `Photoshop` view, it may look different (six projections)

![alt text](assets/images/cubemap-photoshop-example.png)
:::

## Start

To give an example, let's create a simple procedural sky.

To do this, go to `Shading` or open `Shader Editor` ![alt text svg-icon](../../../static/icons/blender/shader.svg).

In `Shader Type` select `World` ![alt text svg-icon](../../../static/icons/blender/world.svg)

Find and add the [Sky Texture Node](https://docs.blender.org/manual/en/4.3/render/shader_nodes/textures/sky.html) and connect it to the [Background Node](https://docs.blender.org/manual/en/4.3/render/shader_nodes/shader/background.html) that is connected to the [World Output Node](https://docs.blender.org/manual/en/4.3/render/shader_nodes/output/world.html).

![alt text centered](assets/images/creating-cubemap-in-blender-node-example.png)

:::tip
If you are using `Nishita`, you will need to uncheck `Sun Disc`, as the sun positions are set in a separate `suns.ltx` file
:::

Switch Render Engine to `Cycles` in `Render Properties` ![alt text svg-icon](../../../static/icons/blender/scene.svg).

Scene should look like this.

![alt text centered](assets/images/creating-cubemap-in-blender-scene.png)

Далее нам нужно создать камеру и настроить ее.

Создайте камеру. В Object Data Properties для камеры в списке Lens в Type выберете Panoramic, а в появившемся Panorama Type выберете Equirectangular.

Перейдите в режим просмотра из камеры, она должна выглядить так.

:::tip
Для примера я добавил куб, чтобы было понятнее
:::

Перейдите в Output Properties, нужно настроить разрешение камеры.

:::note
Так как в игре будет шесть проекций, нам нужно расчитать разрешение камеры.
:::

Для примера одна сторона будет в 512x512 разрешении

:::tip Автоматизированный скрипт
Вы можете использовать автоматизированный скрипт для Blender. Он рендерит 6 сторон и сшивает все в одну 6x1 *.tga текстуру.

Для этого установите Pillow

```bash
pip install Pillow
```

И выполните скрипт:

```python
import bpy
import os
from math import radians
from PIL import Image


def render_cubemap_targa(output_path, resolution, save_intermediates):

    # Create a folder for intermediate images
    if save_intermediates:
        intermediate_dir = os.path.join(
            os.path.dirname(bpy.path.abspath(output_path)), "cubemap_sides"
        )
        os.makedirs(intermediate_dir, exist_ok=True)
        print(f"The intermediate images will be saved in: {intermediate_dir}")

    # Save current settings
    original_camera = bpy.context.scene.camera
    original_render_path = bpy.context.scene.render.filepath
    original_resolution_x = bpy.context.scene.render.resolution_x
    original_resolution_y = bpy.context.scene.render.resolution_y
    original_file_format = bpy.context.scene.render.image_settings.file_format
    original_color_mode = bpy.context.scene.render.image_settings.color_mode
    original_compression = bpy.context.scene.render.image_settings.compression

    try:
        # Creating a temporary camera for cubemap
        if "Cubemap_Camera" in bpy.data.objects:
            bpy.data.objects.remove(bpy.data.objects["Cubemap_Camera"], do_unlink=True)

        bpy.ops.object.camera_add(
            enter_editmode=False, align="WORLD", location=(0, 0, 0)
        )
        camera = bpy.context.active_object
        camera.name = "Cubemap_Camera"
        camera.data.type = "PERSP"
        camera.data.angle = radians(90)  # 90 degrees for cubemap

        # Set camera settings
        bpy.context.scene.camera = camera
        bpy.context.scene.render.resolution_x = resolution
        bpy.context.scene.render.resolution_y = resolution
        bpy.context.scene.render.image_settings.file_format = "TARGA_RAW"
        bpy.context.scene.render.image_settings.color_mode = "RGB"

        print("Render settings are set to TARGA_RAW")

        # List of render paths
        render_paths = []

        # Determine rotation angles for the 6 sides of the cube
        # Format: (name, (x_rotation, z_rotation))
        directions = [
            ("left", (90, -90)),  # Blender +X
            ("right", (90, 90)),  # Blender -X
            ("top", (180, 0)),  # Blender +Z
            ("bottom", (0, 0)),  # Blender -Z
            ("front", (90, 0)),  # Blender +Y
            ("back", (90, 180)),  # Blender -Y
        ]

        # Render each side
        for i, (name, (x_rot, z_rot)) in enumerate(directions):
            # Rotate camera
            camera.rotation_euler = (radians(x_rot), 0, radians(z_rot))

            # Side save path
            if save_intermediates:
                render_path = os.path.join(intermediate_dir, f"cube_{name}.tga")
            else:
                render_path = os.path.join(bpy.app.tempdir, f"cube_{name}.tga")

            render_paths.append(render_path)

            # Setting up render path
            bpy.context.scene.render.filepath = render_path

            # Rendering
            print(f"Rendering {name}... ({i+1}/6)")
            bpy.ops.render.render(write_still=True)

        # We combine all images into one row
        print("Combining images...")
        combine_images_horizontal_tga(render_paths, output_path)
        print(f"Cubemap saved: {output_path}")

        if save_intermediates:
            print(f"Intermediate images are saved in: {intermediate_dir}")

    except Exception as e:
        print(f"Rendering error: {e}")
        raise

    finally:
        # Restoring original settings
        bpy.context.scene.camera = original_camera
        bpy.context.scene.render.filepath = original_render_path
        bpy.context.scene.render.resolution_x = original_resolution_x
        bpy.context.scene.render.resolution_y = original_resolution_y
        bpy.context.scene.render.image_settings.file_format = original_file_format
        bpy.context.scene.render.image_settings.color_mode = original_color_mode
        bpy.context.scene.render.image_settings.compression = original_compression

        # Removing temporary camera
        if "Cubemap_Camera" in bpy.data.objects:
            bpy.data.objects.remove(bpy.data.objects["Cubemap_Camera"], do_unlink=True)


def combine_images_horizontal_tga(image_paths, output_path):
    """
    Combines TGA images into one horizontal strip
    """
    try:
        from PIL import Image
    except ImportError:
        print("PIL not found. Install Pillow: pip install Pillow")
        return False

    images = []
    missing_files = []

    for path in image_paths:
        if os.path.exists(path):
            try:
                img = Image.open(path)
                images.append(img)
                print(f"Loaded: {os.path.basename(path)}")
            except Exception as e:
                print(f"Loading error {path}: {e}")
                missing_files.append(path)
        else:
            print(f"File not found: {path}")
            missing_files.append(path)

    if missing_files:
        print(f"No files found: {len(missing_files)}")
        return False

    if len(images) != 6:
        print(f"Expected 6 images, received {len(images)}")
        return False

    # Create a new image 6x wide and 1x high
    width, height = images[0].size
    print(f"Size of each image: {width}x{height}")

    combined = Image.new("RGB", (width * 6, height))

    # Inserting images
    for i, img in enumerate(images):
        combined.paste(img, (i * width, 0))
        print(f"Image added {i+1}/6")

    # Save as TGA
    output_tga_path = (
        output_path if output_path.lower().endswith(".tga") else output_path + ".tga"
    )
    combined.save(output_tga_path, "TGA")
    print(f"Final image is saved as TGA: {output_tga_path}")

    return True


def main():
    """
    Main function - configure paths and parameters here
    """
    # Settings
    # Save next to the .blend file
    base_path = bpy.path.abspath("//")
    output_path = os.path.join(base_path, "cubemap_result.tga")
    resolution = 512  # Resolution of each side

    print("Start creating a cubemap in TARGA_RAW...")
    print(f"The final result will be saved in: {output_path}")

    render_cubemap_targa(output_path, resolution, save_intermediates=True)
    print("Ready!")


# Running the script
if __name__ == "__main__":
    main()
```

:::

## Сшивание

У нас есть 6 сторон куба и надо его сшить.

Данное действие можно сделать с помощью следующих программ

### Via Texassemble

```bash
texassemble cube -o cubemap.dds lobbyxpos.jpg lobbyxneg.jpg lobbyypos.jpg lobbyyneg.jpg lobbyzpos.jpg lobbyzneg.jpg
```

## Convert to DDS Cube Map

### Via NVIDIA Texture Tool Exporter

Достаточно просто перенести drag-and-drop'ом текстуру, выбрать Cube Map, настроить ее и экспортировать

### Via SDK

Скопируйте сшитую текстуру в папку import.

Откройте Actor Editor -> Editors -> Image -> Check New Textures

Откроется Image Editor в режиме импорта, настройте и нажмите OK или Selected.
