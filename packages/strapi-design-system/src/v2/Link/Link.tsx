import React from 'react';

import { ExternalLink } from '@strapi/icons';
import styled from 'styled-components';

import { BaseLink, BaseLinkProps } from '../../BaseLink';
import { Box } from '../../Box';
import { buttonFocusStyle } from '../../themes/utils';
import { Typography } from '../../Typography';

const LinkWrapper = styled(BaseLink)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : undefined)};

  svg {
    font-size: ${10 / 16}rem;

    path {
      fill: ${({ disabled, theme }) => (disabled ? theme.colors.neutral600 : theme.colors.primary600)};
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary500};
  }

  &:active {
    color: ${({ theme }) => theme.colors.primary700};
  }

  ${buttonFocusStyle};
`;

const IconWrapper = styled(Box)`
  display: flex;
`;

export interface LinkProps extends BaseLinkProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  /**
   * @default true
   */
  isExternal?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, href, disabled = false, startIcon, endIcon, isExternal = true, ...props }, ref) => {
    return (
      <LinkWrapper ref={ref} href={href} disabled={disabled} {...props}>
        {startIcon && (
          <IconWrapper as="span" aria-hidden paddingRight={2}>
            {startIcon}
          </IconWrapper>
        )}

        <Typography textColor={disabled ? 'neutral600' : 'primary600'}>{children}</Typography>

        {endIcon && (
          <IconWrapper as="span" aria-hidden paddingLeft={2}>
            {endIcon}
          </IconWrapper>
        )}

        {href && !endIcon && isExternal && (
          <IconWrapper as="span" aria-hidden paddingLeft={2}>
            <ExternalLink />
          </IconWrapper>
        )}
      </LinkWrapper>
    );
  },
);

Link.displayName = 'Link';
