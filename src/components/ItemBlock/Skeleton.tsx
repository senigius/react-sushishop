import ContentLoader from 'react-content-loader';

import styles from './ItemBlock.module.scss';

const Skeleton = () => (
  <ContentLoader
    className={styles.block}
    speed={2}
    width={280}
    height={492}
    viewBox="0 0 280 492"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="64" y="145" rx="0" ry="0" width="114" height="20" />
    <rect x="56" y="209" rx="0" ry="0" width="164" height="36" />
    <rect x="0" y="279" rx="18" ry="18" width="280" height="71" />
    <rect x="29" y="377" rx="14" ry="14" width="72" height="34" />
    <rect x="136" y="376" rx="24" ry="24" width="119" height="38" />
    <rect x="0" y="0" rx="0" ry="0" width="280" height="200" />
  </ContentLoader>
);

export default Skeleton;
