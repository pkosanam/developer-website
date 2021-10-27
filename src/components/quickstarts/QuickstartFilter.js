import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Icon } from '@newrelic/gatsby-theme-newrelic';

import check from '../../images/check.svg';

const QuickstartFilter = ({
  name,
  type,
  icon,
  count,
  isChecked,
  handleFilter,
  className,
}) => (
  <div
    className={className}
    key={name}
    css={css`
      padding: 1rem 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: var(--primary-text-color);
      font-weight: 100;
      display: flex;
      align-items: center;
    `}
  >
    <div
      css={css`
        display: flex;
        align-items: center;
        width: 100%;
      `}
    >
      <Icon
        name={icon}
        size="1.25rem"
        css={css`
          fill: currentColor;
          stroke-width: 0.25;
          margin: 0 0.5rem;
        `}
      />
      <label
        css={css`
          width: 100%;
          :hover {
            cursor: ${count === 0 ? `auto` : `pointer`};
            color: ${count === 0
              ? `var(--primary-text-color)`
              : `var(--color-brand-500)`};
          }
        `}
        htmlFor={type}
      >{`${name} (${count})`}</label>
    </div>
    <input
      type="checkbox"
      checked={isChecked}
      id={type}
      disabled={count === 0}
      onChange={(e) => handleFilter(type, e)}
      css={css`
        appearance: none;
        border: solid 1px var(--primary-text-color);
        height: 1rem;
        width: 1rem;
        border-radius: 3px;
        :hover {
          cursor: pointer;
        }
        :checked {
          background-color: var(--color-brand-500);
          border: solid 1px var(--color-brand-500);
          background-image: url(${check});
          background-position: 50%;
          background-repeat: no-repeat;
        }
        :disabled {
          border: solid 1px var(--border-color);
          cursor: auto;
        }
      `}
    />
  </div>
);

QuickstartFilter.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  count: PropTypes.number,
  isChecked: PropTypes.bool,
  handleFilter: PropTypes.func,
  className: PropTypes.string,
};

export default QuickstartFilter;
