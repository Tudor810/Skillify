import React,{useContext, useState} from 'react'
import { GetStartedContext } from '../../App'
import httpClient from '../../httpClient';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material' 
import {categories, selectStyle} from './data'

export default function PricingCard({data,timePrice, isAuthentificated}) {

  const { toggleGetStarted } = useContext(GetStartedContext);

  const [selectCategory, setSelectCategory] = useState("")
  const [error, setError] = useState("")
  const handleCategoryChoice = (event) => {
    const {value} = event.target
    setSelectCategory(value.split(" ")[0] === "Videos" ? "summary" : value)
  }

  const listElements = data.benefits.map((item,index) => {
    return <li key={index}><i className="fa-solid fa-square-check"></i>{item}</li>
  })
  const handlePay = async () => {

    if(data.title === "Skillify Category" && selectCategory === "")
    {
      setError("You need to select a category")
      return
    }
     
    try {
      const resp = await httpClient.post("https://api.skillify-ai.com/stripe/create-checkout-session",{
        priceId: !timePrice ? data.priceCode : data.priceCodeYearly,
        category: data.title === "Skillify Category" ? selectCategory.toLowerCase().replace(" ", "-") : "",
        switch: timePrice
      })
      window.location.href = resp.data.url
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className = "price-card">
        {data.discount !== 0   && <span className='discount'>Special discount {data.discount}%</span>}
        <div>
          <div className='price-top'>
            <h4 className='price-card-title'>{data.title} {timePrice ? "Premium" : ""} </h4>
            {data.discount !== 0 && <div className='full-price'>{!timePrice ? data.price : data.price * 10}$</div>}
          </div>
          <p className='price-card-description'>{data.description}</p>
        </div>
        {/* <span className='price-card-cost'>{`$ ${data.price !== 0 ? !timePrice ? data.discount ? (data.price - data.price * data.discount / 100).toFixed(2) : data.price : data.discount ? Math.round(data.price * 10 - data.price * 10 * data.discount / 100).toFixed(2) - 3 : Math.round(data.price * 10 * 100) / 100 + "9" : '0'} /month`}</span> */}
        {<span className = 'price-card-cost'>{`€ ${data.price !== 0 ? timePrice ? data.price : data.price !== 9.99 ? data.price - 2 : data.price - 3 : 0}` } /month</span>}
        <span style={{maxWidth: '100%'}}>{data.longDescription}</span>
        <ul className='price-card-benefits'>
          {listElements}
          {timePrice && data.specialBenefit && <li><strong><i className="fa-solid fa-square-check"></i>{data.specialBenefit[0]}</strong></li>}
        </ul>
        <ul className='price-card-not-avaible'>
          {data.notAvaible ? data.notAvaible.map((item, index) => {
            return <li key={index}><i className="fa-solid fa-xmark"></i>{item}</li>
          }) : ""}
          {!timePrice && <li><i className="fa-solid fa-xmark"></i>GPT-4</li>}
        </ul>

        {data.title === "Skillify Category" && 
          <FormControl className='select-container'>
          <InputLabel htmlFor="my-select" sx={{
            color: "white"
          }}>Category</InputLabel>
            <Select  
              id="my-select"
              label="Category"
              className='select'
              sx={selectStyle}
              value={selectCategory}
              onChange={handleCategoryChoice}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'var(--card-background)',
                    paddingInline: '15px'
                  },
                }}}
            >
              {categories.map((item, index) => {
              return <MenuItem key = {index} className = "mui-menu-item" value = {item.secondaryTitle === "Summary" ? item.secondaryTitle : item.title}><i className={`fa-solid ${item.icon}`}></i>   {item.secondaryTitle === "Summary" ? item.secondaryTitle : item.title}a</MenuItem>
            })}
          </Select>  
        </FormControl>
        }
        <button onClick = {() => {
          if(isAuthentificated === false)
            toggleGetStarted()
          else {
            handlePay()
          }
        }} className='price-button'>{!isAuthentificated ? "Get started today": "Upgrade your plan"}</button>
        {data.title === "Skillify Category" && <span className='error'>{error}</span>}
    </div>
  )
}
