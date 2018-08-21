import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Loader from '../src/components/Loader';
import Autocompleter from "../src/components/Autocompleter/Autocompleter";

storiesOf('Loader', module)
    .add('simple loader', () => (
        <Loader />
    ));

storiesOf('Autcompleter', module)
    .add('Autocompleter', () => (
        <Autocompleter />
    ));