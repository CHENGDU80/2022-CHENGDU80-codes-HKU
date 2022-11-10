import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;

const { tableau } = window;

interface LabelDistributionProps {
  style?: React.CSSProperties;
}

const LabelDistribution: React.FC<LabelDistributionProps> = (
  props: LabelDistributionProps
) => {
  const { style = {} } = props;

  const ref = useRef(null);
  const url =
    'https://public.tableau.com/views/1_16678375841320/1_1?:language=en-US&:display_count=n&:origin=viz_share_link&:toolbar=no';

  useEffect(() => {
    new tableau.Viz(ref.current, url, {});
  }, []);

  return <div style={style} id="labelDistribution" ref={ref}></div>;
};

export default LabelDistribution;
