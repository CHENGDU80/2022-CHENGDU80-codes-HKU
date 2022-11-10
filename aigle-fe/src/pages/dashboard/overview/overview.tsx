import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import LabelDistribution from './components/labelDistribution';
import MissingValueDistribution from './components/missingValueDistribution';
import useResizable from '@/hooks/useResizable';
import Resizer from '@/components/resizer';
import { IconMoreStroked } from '@douyinfe/semi-icons';
import { COLOR_PALETTE } from '@/const/theme/color';
import { PageHeader } from 'antd';

const { useRef, useState, useEffect, useMemo } = React;

// window.onload = () => {
//   // get two iframes
//   const iframes = document.getElementsByTagName('iframe');
//   debugger;
//   [...iframes].forEach(iframe => {
//     console.log(
//       '%c iframe.contentWindow >>>',
//       'background: yellow; color: blue',
//       iframe.contentWindow
//     );
//   });
// };

interface OverviewProps {}

const Container = styled.section`
  padding: 24px;
`;

const Content = styled.div`
  padding-left: 8px;
`;

const Overview: React.FC<OverviewProps> = (props: OverviewProps) => {
  const {} = props;

  const ref = useRef<HTMLElement>(null);

  return (
    <>
      <Container>
        <PageHeader title="Data Overview"></PageHeader>
        <Content>
          <LabelDistribution></LabelDistribution>
          <MissingValueDistribution
            style={{
              marginTop: 80,
            }}
          ></MissingValueDistribution>
        </Content>
      </Container>
    </>
  );
};

export default Overview;
