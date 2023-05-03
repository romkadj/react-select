import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import Select, {SelectInstance, StylesConfig} from 'react-select';

import {Field, Inline, Stack} from '../components';
import {ColourOption, colourOptions, defaultArgs} from '../data';

/**
 * More on default export:
 * @see https://storybook.js.org/docs/react/writing-stories/introduction#default-export
 */
export default {
  title: 'Select/BasicSingle',
  component: Select,
  /**
   * More on argTypes:
   * @see https://storybook.js.org/docs/react/api/argtypes
   */
  argTypes: {},
} as ComponentMeta<typeof Select>;

// =============================================================================
// Styles
// =============================================================================

const styles: StylesConfig<ColourOption, false> = {
  menu: (base) => ({ ...base, position: 'relative' }),
};

/**
 * More on component templates:
 * @see https://storybook.js.org/docs/react/writing-stories/introduction#using-args
 */
const Template: ComponentStory<typeof Select> = ({
                                                   inputId = 'react-select',
                                                   ...props
                                                 }) => {
  // return (
  //   <Field htmlFor={inputId}>
  //     <Select inputId={inputId} {...props} />
  //   </Field>
  // );

  const inputRef = React.useRef<SelectInstance<ColourOption>>(null);
  const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>(false);
  const [selectedValue, setSelectedValue] = React.useState<ColourOption | undefined | null>();
  const parentRef = React.useRef<any>();

  function toggleMenuIsOpen() {
    setMenuIsOpen((value) => !value);
    const selectEl = inputRef.current;
    if (!selectEl) return;
    if (menuIsOpen) selectEl.blur();
    else selectEl.focus();
  }

  React.useEffect(() => {
    const test1 = (event: any) => {
      console.log("BasicSingle.stories.tsx:58", event);
      console.log("BasicSingle.stories.tsx:58-1");
    };

    const test2 = (event: any) => {
      console.log("BasicSingle.stories.tsx:63", event);
      console.log("BasicSingle.stories.tsx:58-2");
    };

    if (parentRef.current) {
      parentRef.current.addEventListener('click', test1);
      parentRef.current.addEventListener('mousedown', test2);
    }

    return () => {
      if (parentRef.current) {
        parentRef.current.removeEventListener('click', test1);
        parentRef.current.removeEventListener('mousedown', test2);
      }
    };
  }, []);

  return (
    <div ref={parentRef}>
      <Stack>
        <Inline>
          <input
            id="menu-toggle"
            type="checkbox"
            checked={menuIsOpen}
            onChange={toggleMenuIsOpen}
          />
          <label htmlFor="menu-toggle">Click to toggle menu</label>
        </Inline>
        <Inline>
          <input
            id="input-reset"
            type="button"
            onClick={() => {
              setSelectedValue(undefined);
            }}
            value={'Reset value'}
          />
        </Inline>
        <Field label="Controlled Menu" htmlFor="controlled-menu-id">
          <Select
            inputId="controlled-menu-id"
            ref={inputRef}
            placeholder={'-- select value --'}
            value={selectedValue}
            openMenuOnClick={true}
            onChange={() => (value: any) => {
              setSelectedValue(value);
            }}
            stopPropagation
            options={colourOptions}
            styles={styles}
          />
        </Field>
      </Stack>
    </div>
  );
};

export const BasicSingle = Template.bind({});
/**
 * More on args:
 * @see https://storybook.js.org/docs/react/writing-stories/args
 */
BasicSingle.args = {
  ...defaultArgs,
};
