import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Product from '../../models/Product';
import mongoose from "mongoose";
import Error from 'next/error'
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

const Slug = ({ addtoCart, product, variants, buyNow, clearCart, error }) => {
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (!error) {
      if (product.availableQty > 0) {
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }

    }
  }, [router.query])


  const checkServiceAbility = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
      setService(true)
      toast.success('Yay! Your Pincode is servicable', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      setService(false)
      toast.error('Sorry, Pincode not serviceable', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const onChangePin = (e) => {
    setPin(e.target.value)
  }

  const refreshVariant = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]['slug']}`
    router.push(url)
  }

  if (error == 404) {
    return <Error statusCode={404} />
  }

  return <>
    <section className="text-gray-600 body-font overflow-hidden">
    <Head><title>{product.title} | GeeksWear</title></Head>
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded" src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Tshirts</h2>
            <h1 className="text-gray-900 w-full text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>
            {/* <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div> */}
            <p className="leading-relaxed my-4">{product.desc}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes('White') && Object.keys(variants['White']).includes(product.size) && <button onClick={() => { refreshVariant(product.size, 'White') }} className={`border-2 rounded-full w-6 h-6 focus:outline-none ${product.color === 'White' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Red') && Object.keys(variants['Red']).includes(product.size) && <button onClick={() => { refreshVariant(product.size, 'Red') }} className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${product.color === 'Red' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Blue') && Object.keys(variants['Blue']).includes(product.size) && <button onClick={() => { refreshVariant(product.size, 'Blue') }} className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${product.color === 'Blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Gray') && Object.keys(variants['Gray']).includes(product.size) && <button onClick={() => { refreshVariant(product.size, 'Gray') }} className={`border-2 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none ${product.color === 'Gray' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Green') && Object.keys(variants['Green']).includes(product.size) && <button onClick={() => { refreshVariant(product.size, 'Green') }} className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${product.color === 'Green' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Black') && Object.keys(variants['Black']).includes(product.size) && <button onClick={() => { refreshVariant(product.size, 'Black') }} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${product.color === 'Black' ? 'border-gray-900' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Purple') && Object.keys(variants['Purple']).includes(product.size) && <button onClick={() => { refreshVariant(product.size, 'Purple') }} className={`border-2 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none ${product.color === 'Purple' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Yellow') && Object.keys(variants['Yellow']).includes(product.size) && <button onClick={() => { refreshVariant(product.size, 'Yellow') }} className={`border-2 ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none ${product.color === 'Yellow' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('Pink') && Object.keys(variants['Pink']).includes(product.size) && <button onClick={() => { refreshVariant(product.size, 'Pink') }} className={`border-2 ml-1 bg-pink-400 rounded-full w-6 h-6 focus:outline-none ${product.color === 'Pink' ? 'border-black' : 'border-gray-300'}`}></button>}
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={product.size} onChange={(e) => { refreshVariant(e.target.value, product.color) }} className="rounded border appearance-none py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">
                    {Object.keys(variants[product.color]).includes('S') && <option value={'S'}>S</option>}
                    {Object.keys(variants[product.color]).includes('M') && <option value={'M'}>M</option>}
                    {Object.keys(variants[product.color]).includes('L') && <option value={'L'}>L</option>}
                    {Object.keys(variants[product.color]).includes('XL') && <option value={'XL'}>XL</option>}
                    {Object.keys(variants[product.color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            {product.availableQty < 5 && product.availableQty > 0 && <span className='text-red-600 font-semibold'>Hurry Only {product.availableQty} left !</span>}
            <div className="my-3 flex">
              {!disabled ? <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}/-</span> : <span className="my-auto title-font font-medium text-md md:text-2xl text-red-600">Out Of Stock</span>}
              <button disabled={disabled} onClick={() => { buyNow(slug, 1, product.price, product.title, product.size, product.color, product.img) }} className="disabled:bg-blue-200 flex ml-4 text-white bg-blue-500 border-0 text-sm md:text-md py-3 px-1 md:px-6 focus:outline-none hover:bg-blue-600 rounded">Buy now</button>
              <button disabled={disabled} onClick={() => {
                addtoCart(slug, 1, product.price, product.title, product.size, product.color, product.img); toast.success('Added to cart', {
                  position: "bottom-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }} className="disabled:bg-blue-200 flex ml-4 text-white bg-blue-500 border-0 text-sm md:text-md py-3 px-1 md:px-6 focus:outline-none hover:bg-blue-600 rounded">Add to Cart</button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
            <div className="pin flex space-x-2 mt-8">
              <input onChange={onChangePin} className='border-2 border-gray-400 px-1 py-1 md:px-2 md:py-2 rounded-lg focus:outline-blue-300' type="text" name="" id="" placeholder='Enter Your Pincode' />
              <button onClick={checkServiceAbility} className="flex ml-12 text-white bg-blue-500 border-0 px-2 py-1 my-auto md:py-3 md:px-6 focus:outline-none hover:bg-blue-600 rounded">Check</button>
            </div>
            {(!service && service != null) && <div className='text-red-700 text-sm mt-3'>
              Sorry We do not deliver to this pincode yet
            </div>}
            {(service && service != null) && <div className='text-green-700 text-sm mt-3'>
              Yay! This pincode is servicable
            </div>}
          </div>
        </div>
      </div>
    </section>
  </>
}

export async function getServerSideProps(context) {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug })
  if (product == null) {
    return {
      props: { error: 404 }
    }
  }
  let variants = await Product.find({ title: product.title, category: product.category })
  let colorSizeSlug = {}
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }

  return {
    props: { error: error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) },
  }
}

export default Slug