import HRLayout from "../../components/layout/HRLayout";

import PayrollWidget from "../../components/hr/PayrollWidget";

export default function PayrollPage(){

return(

<HRLayout>

<div className="space-y-8">

<h1 className="text-5xl font-black">

Payroll

</h1>

<PayrollWidget/>

</div>

</HRLayout>

)

}