import React from 'react';
import { Layout } from '../Layout';
import layout from '../Layout/constant';

const LIST = { 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve' }

export function Editor({ ...props }) {
  const { history: { query } } = { ...props };
  console.log(layout[LIST[query?.id]])
  return (
    <div>
      <Layout {...props} {...layout[LIST[query?.id]]}>
        <div onClick={() => {
          alert('test1');
        }}>test1</div>
        <div onClick={() => {
          alert('test2');
        }}>test2</div>
        <div onClick={() => {
          alert('test3');
        }}>test3</div>
        <div onClick={() => {
          alert('test4');
        }}>test4</div>
        <div onClick={() => {
          alert('test5');
        }}>test5</div>
        <div onClick={() => {
          alert('test6');
        }}>test6</div>
        <div onClick={() => {
          alert('test7');
        }}>test7</div>
        <div onClick={() => {
          alert('test8');
        }}>test8</div>
        <div onClick={() => {
          alert('test9');
        }}>test9</div>
        <div onClick={() => {
          alert('test10');
        }}>test10</div>
        <div onClick={() => {
          alert('test11');
        }}>test11</div>
        <div onClick={() => {
          alert('test12');
        }}>test12</div>
        <div onClick={() => {
          alert('test13');
        }}>test13</div>
      </Layout>
    </div>
  );
}
