import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;

const { tableau } = window;

interface MissingValueDistributionProps {
  style?: React.CSSProperties;
}

const MissingValueDistribution: React.FC<MissingValueDistributionProps> = (
  props: MissingValueDistributionProps
) => {
  const { style = {} } = props;

  const ref = useRef(null);
  const url =
    'https://public.tableau.com/views/1_16678375841320/Missingvalueover25?:language=en-US&:display_count=n&:origin=viz_share_link';

  useEffect(() => {
    new tableau.Viz(ref.current, url, {});
  }, []);

  return <div style={style} id="missingValueDistribution" ref={ref}></div>;
};

export default MissingValueDistribution;
