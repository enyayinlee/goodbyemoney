'use client'
import { useState } from "react"
import ShopWindow from "../src/components/ShopWindow"
import * as data from '../src/Data.json'

export default function Home() {
  const [openShopWindow, setOpenShopWindow] = useState(false)
  return (
    <main >
      <div>hello</div>
      <button onClick={() => setOpenShopWindow(true)}>click</button>
      {openShopWindow && <ShopWindow {...data.works[0]} onClose={() => setOpenShopWindow(false)} />}
    </main>
  )
}
