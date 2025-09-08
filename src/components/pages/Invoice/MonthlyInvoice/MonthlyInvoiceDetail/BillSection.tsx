const BillSection = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Tenant Info */}
      <div>
        <h4>BILL TO:</h4>
        <div className="space-y-1">
          <p className="font-medium">John Smith</p>
          <div className="text-theme-secondary">
            <p>john@email.com</p>
            <p>+66-123-456-789</p>
            <p>Unit: A-101</p>
            <p>Building A - Floor 1</p>
          </div>
        </div>
      </div>

      {/* Billing Period */}
      <div>
        <h4>BILLING PERIOD:</h4>
        <div className="text-theme-secondary space-y-1">
          <p>September 2025</p>
          <p>Due Date: 9/30/2025</p>
          <p>Contract: CT-001</p>
        </div>
      </div>
    </div>
  )
}

export default BillSection
