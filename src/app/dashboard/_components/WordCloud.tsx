import { useTheme } from 'next-themes'
import React from 'react'
import D3WordCloud from 'react-d3-cloud'

type Props = {}
const data = [
  {
    text: "Hey",
    value: 3,
  },
  {
    text: "lol",
    value: 1,
  },
  {
    text: "computer",
    value: 10,
  }
];

const fontSizeMapper = (word: {value: number}) => Math.log2(word.value) * 6 + 10;

const WordCloud = (props: Props) => {
  const theme = useTheme()
  return (
    <>
      <D3WordCloud
        height={550} 
        font="Times" 
        fontSize={fontSizeMapper} 
        rotate={0}
        padding={10}
        data ={data}
        fill={theme.theme == "dark" ? "white": "dark"}
      />
      
    </>
  )
}

export default WordCloud