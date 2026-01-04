import React from 'react';
import Content from '@theme-original/DocItem/Content';
import PiPButton from '@site/src/components/PiPButton';

export default function ContentWrapper(props: any) {
  return (
    <>
      <div className="pip-button-container">
        <PiPButton />
      </div>
      <Content {...props} />
    </>
  );
}