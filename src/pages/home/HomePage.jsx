import React from 'react'
import { useOneBase } from '../../hooks/useBase'

export default function HomePage() {
    const { data, isPending } = useOneBase(3);
    !isPending && console.log(data);
  return (
    <div></div>
  )
}
