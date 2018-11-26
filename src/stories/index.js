import React from 'react';
import { storiesOf } from '@storybook/react';
import App from '../App';
import data from '../data';

const newData = data.map(item => ({ ...item, enabled: false }));

storiesOf('Components', module)
  .add('structure-files', () => (
    <App />
  ));


storiesOf('Search input', module)
  .add('search by all', () => (
    <App searchType="all" />
  ))
  .add('search by start with', () => (
    <App searchType="startWith" />
  ))
  .add('search by start exact', () => (
    <App searchType="exact" />
  ));
storiesOf('Choice files and folders', module)
  .add('no multiple choice', () => (
    <App choiceMultiple={false} />
  ))
  .add('multiple choice', () => (
    <App />
  ))
  .add('forbidden choice', () => (
    <App structure={newData} />
  ));
storiesOf('Icons', module)
  .add('different colors', () => (
    <App icons={[{
      ext: 'csv',
      color: 'green',
    }, {
      ext: '',
      color: 'blue',
    }, {
      name: 'folder',
      color: 'brown',
    },
    {
      name: 'folderOpen',
      color: 'red',
    }]}
    />
  )).add('different icons', () => (
    <App icons={[{
      ext: 'png',
      iconName: 'file-code',
    }, {
      ext: '',
      iconName: 'file-alt',
    },
    {
      ext: 'csv',
      iconName: 'file-excel',
    }, {
      name: 'folder',
      iconName: 'folder-open',
    }]}
    />
  )).add('different sizes', () => (
    <App icons={[{
      ext: 'png',
      size: '2x',
    }, {
      ext: '',
      size: 'sm',
    },
    {
      ext: 'csv',
      size: '3x',
    }, {
      name: 'folder',
      size: '3x',
    },
    {
      name: 'folderOpen',
      size: 'lg',
    }]}
    />
  ));
