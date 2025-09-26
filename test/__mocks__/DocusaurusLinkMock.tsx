import React from 'react';

type Props = React.PropsWithChildren<{ to?: string; className?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>>;

const DocusaurusLinkMock = ({ to, children, ...rest }: Props) => {
  // Render as a normal anchor for tests
  return (
    <a href={to} {...rest}>
      {children}
    </a>
  );
};

export default DocusaurusLinkMock;


