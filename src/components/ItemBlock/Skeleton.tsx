import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="sushi-block"
    speed={2}
    width={280}
    height={492}
    viewBox="0 0 280 492"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="64" y="145" rx="0" ry="0" width="114" height="20" />
    <rect x="56" y="209" rx="0" ry="0" width="164" height="36" />
    <rect x="0" y="279" rx="0" ry="0" width="280" height="165" />
    <rect x="29" y="455" rx="0" ry="0" width="72" height="34" />
    <rect x="139" y="451" rx="24" ry="24" width="119" height="38" />
    <rect x="0" y="0" rx="0" ry="0" width="280" height="200" />
  </ContentLoader>
);

export default Skeleton;
