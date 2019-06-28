import React from 'react'
import { cx, css } from 'emotion'
import PropTypes from 'prop-types';
import { Popover } from 'antd'

export const Button = React.forwardRef(
    ({ className, active, reversed, ...props }, ref) => (
        <span
          {...props}
          ref={ref}
          className={cx(
              className,
              css`cursor: pointer; color: ${reversed ? active ? 'white' : '#aaa' : active ? 'black' : '#ccc'};`
          )}
    />
    )
)

Button.propTypes = {
    className: PropTypes.any,
    active: PropTypes.any,
    reversed: PropTypes.any,
}

/**
 * ------------------------------------------------------------------------------
 */
export const EditorValue = React.forwardRef(
    ({ className, value, ...props }, ref) => {
        const textLines = value.document.nodes
            .map(node => node.text)
            .toArray()
            .join('\n')
        return (
            <div
              ref={ref}
              {...props}
              className={cx(
                  className,
                  css`margin: 30px -20px 0;`
              )}
      >
                <div
                  className={
                      css`
                        font-size: 14px;
                        padding: 5px 20px;
                        color: #404040;
                        border-top: 2px solid #eeeeee;
                        background: #f8f8f8;
                        `
                    }
        >
          Slate's value as text
                </div>
                <div
                  className={
                      css`
                        color: #404040;
                        font: 12px monospace;
                        white-space: pre-wrap;
                        padding: 10px 20px;
                        div {
                            margin: 0 0 0.5em;
                        }
                        `
                    }
                >
                    {textLines}
                </div>
            </div>
        )
    }
)

EditorValue.propTypes = {
    className: PropTypes.any,
    value: PropTypes.any,
}

/**
 * ------------------------------------------------------------------------------
 */
export const Icon = React.forwardRef(({ className, remarks = '-', ...props }, ref) => {
    return (
        <Popover content={remarks} title=''>
            <span
              {...props}
              ref={ref}
              className={cx(
                  'material-icons',
                  className,
                  css`
                    font-size: 18px;
                    vertical-align: text-bottom;
                    `
              )}
                />
        </Popover>
    )
})

Icon.propTypes = {
    className: PropTypes.any,
    remarks: PropTypes.any,
}

/**
 * ------------------------------------------------------------------------------
 */
export const Instruction = React.forwardRef(({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cx(
          className,
          css`white-space: pre-wrap; margin: 0 -20px 10px; padding: 10px 20px; font-size: 14px; background: #f8f8e8;`
      )}
  />
))

Instruction.propTypes = {
    className: PropTypes.any,
}

/**
 * ------------------------------------------------------------------------------
 */
export const Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cx(
          className,
          css`& > * { display: inline-block; } & > * + * { margin-left: 15px;}`
      )}
  />
))

Menu.propTypes = {
    className: PropTypes.any,
}

/**
 * ------------------------------------------------------------------------------
 */
export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
          className,
          css`position: relative; padding: 8px 18px 8px; margin: 0 -20px; border-bottom: 2px solid #eee; margin-bottom: 20px;`
      )}
  />
))

Toolbar.propTypes = {
    className: PropTypes.any,
}
