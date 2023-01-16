import Link from 'next/link'
import React from 'react'
import Product from '../models/Product'
import mongoose from "mongoose";
import Head from 'next/head'

const Tshirts = ({ products }) => {
  return (
    <section className="text-gray-600 body-font min-h-screen">
      <Head><title>Tshirts | GeeksWear</title></Head>
      <h3 className='text-2xl font-bold text-center mt-10 text-black'>Tshirts</h3>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center mx-5">
        {Object.keys(products).length === 0 && <p>Sorry all the Tshirts are currently out of stock. Stay tuned! </p>}
          {Object.keys(products).map((item) => {
            return <Link key={item} href={`/product/${products[item].slug}`}>
              <div className="xl:w-[21%] lg:w-[30%] md:w-[40%] sm:w-[60%] p-4 w-full bg-slate-100 cursor-pointer shadow-lg m-2">
                <a className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="h-[30vh] md:h-[35vh] m-auto block" src={products[item].img} />
                </a>
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 font-bold">{item.category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">Rs.{products[item].price}</p>
                  <div className="mt-2">
                    {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                    {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                    {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
                    {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                    {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                  </div>
                  <div className="mt-2">
                    {products[item].color.includes('White') &&  <button className="border-2 border-gray-300 bg-white rounded-full w-6 h-6 focus:outline-none"></button>} 
                    {products[item].color.includes('Red') &&  <button className="border-2 border-gray-300 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>} 
                    {products[item].color.includes('Blue') &&  <button className="border-2 border-gray-300 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>} 
                    {products[item].color.includes('Gray') &&  <button className="border-2 border-gray-300 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>} 
                    {products[item].color.includes('Green') &&  <button className="border-2 border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>} 
                    {products[item].color.includes('Black') &&  <button className="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none"></button>} 
                    {products[item].color.includes('Purple') &&  <button className="border-2 border-gray-300 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>} 
                    {products[item].color.includes('Yellow') &&  <button className="border-2 border-gray-300 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button>} 
                    {products[item].color.includes('Pink') &&  <button className="border-2 border-gray-300 bg-pink-400 rounded-full w-6 h-6 focus:outline-none"></button>} 
                  </div>
                </div> 
              </div>
            </Link>
          })}
        </div>
      </div>
    </section >
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: "tshirts" })
  let tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size)
      }

    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
      else{
        tshirts[item.title].color = []
        tshirts[item.title].size = []
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) },
  }
}

export default Tshirts
