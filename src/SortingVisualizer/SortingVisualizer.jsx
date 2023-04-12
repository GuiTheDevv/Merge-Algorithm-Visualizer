import React from "react";
import './SortingVisualizer.css';
import * as sortingAlgorithms from './sortingAlgorithms.js';                                          

export class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }
    
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 200; i++) {
            array.push(randomIntFromInterval(5, 900));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = sortingAlgorithms.mergeSort(this.state.array);
        const newAnimations = [];

        
        for (const animation of animations) {
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.swap);
        }

        // This loops newAnimations array and uses setTimeout to change colour and height of bars
        for (let i = 0; i < newAnimations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;

            //change colour of bars if not divisible by 3
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = newAnimations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'rebeccapurple' : 'greenyellow';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 8);
            } 
            
            //change height of bars
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = newAnimations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 8);
            }
        }
    }
    
    bubbleSort() {
        const array = this.state.array.slice();
        const animations = sortingAlgorithms.bubbleSort(array);

        //loop through each animation
        for (let i = 0; i < animations.length; i++) {
          const [barOneIdx, barTwoIdx, swap] = animations[i];
          const arrayBars = document.getElementsByClassName('array-bar');

          //swap change heights of bars if swapper
          if (swap) {
            setTimeout(() => {
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              const tempHeight = barOneStyle.height;
              barOneStyle.height = barTwoStyle.height;
              barTwoStyle.height = tempHeight;
            }, i * 8);
          } 
          
          //change bg colour of two bars
          else {
            setTimeout(() => {
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              barOneStyle.backgroundColor = 'greenyellow';
              barTwoStyle.backgroundColor = 'greenyellow';
            }, i * 8);
          }
        }
      }

    render() {
        const {array} =  this.state;

        return (
            <div className="array-container">
            {array.map((value, idx) => (
                <div 
                className="array-bar" 
                key={idx}
                style={{height: `${value}px`}}></div>
            ))}
            <div className="button-container">
                <button onClick={() => this.resetArray()}>New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>
            
            </div>
        );

    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}