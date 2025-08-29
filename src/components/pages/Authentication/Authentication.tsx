import { Button, Form, Input } from '@/components/common'

const Authentication = () => {
  return (
    <div className="bg-theme-light gap-x-25 flex size-3/5 flex-row items-center justify-center rounded-3xl shadow">
      <div className="gap-15 flex w-1/2 flex-col rounded-3xl px-10 py-5">
        <div className="flex flex-col">
          <h2>Guess Who's Back</h2>
          <p>Let's Get You Signed in</p>
        </div>
        <Form>
          FormContext
          <div className="flex items-center justify-center gap-x-2">
            <input type="checkbox" />
            <p className="text-body-3 font-normal">I agree to the terms and policy</p>
          </div>
          <Button className="bg-theme-light text-theme-night border-none font-semibold shadow" block>
            Login
          </Button>
        </Form>
      </div>
      <div>
        <img
          className="h-50 w-80 rounded-xl"
          src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
          alt="building photo"
        />
      </div>
    </div>
  )
}

export default Authentication
