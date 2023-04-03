import axios from "axios"

const Payment = () => {
  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]"
  }

  function isObj(val) {
    return typeof val === "object"
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val)
    } else {
      return val
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form")
    console.log({params});
    form.setAttribute("method", "post")
    form.setAttribute("action", action)

    Object.keys(params).forEach(key => {
      const input = document.createElement("input")
      input.setAttribute("type", "hidden")
      input.setAttribute("name", key)
      input.setAttribute("value", stringifyValue(params[key]))
      form.appendChild(input)
    })
    console.log({form})
    return form
  }

  function post(details) {
    console.log({details})
    const form = buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
  }

  const getData = async data => {
    // const data = {
    //     email: "sridharsp4774@gmail.com", amount: 20
    // }
    // try {
    //     const {data} = await axios.post('http://localhost:3001/api/payment');
    //     console.log(data);
    //
    // } catch (error) {
    //     console.log(error);
    // }
    return fetch(`${process.env.REACT_APP_API}/payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(err => console.log(err))
  }
  const makePayment = e => {
    e.preventDefault()
    getData({ email: "sridharsp4774@gmail.com", mobile: "9345507214" }).then(
      response => {
        console.log(response)
        let information = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: response.body,
        }
        post(information)
      }
    )
  }
  return (
    <div className="Payment">
      <button onClick={e => makePayment(e)}>Payment</button>
    </div>
  )
}

export default Payment

