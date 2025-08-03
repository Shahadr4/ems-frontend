import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBasedRoute from './utils/RoleBasedRoute'
import AdminSummary from './components/dashbord/AdminSummary'
import DepartmemtList from './components/department/DepartmemtList'
import AddDepartment from './components/department/AddDepartment'
import EditDepartment from './components/department/EditDepartment'
import List from './components/employee/List'
import Add from './components/employee/Add'
import Summary from './components/employeeDashboard/Summary'
import Profile from './components/employeeDashboard/Profile'
import View from './components/employee/View'
import AttendenceList from './components/Attendence/AttendenceList' 
import Edit from './components/employee/Edit'
import AdminAttendence from './components/Attendence/AdminAttendence'
import AttendenceReport from './components/Attendence/AttendenceReport'





function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"  />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoute requiredRole={['admin']}>
              <AdminDashboard  />
            </RoleBasedRoute>
            
          </PrivateRoutes>
          
          
          }>
          <Route index element={<AdminSummary />} />
          <Route path='/admin-dashboard/department' element={< DepartmemtList/>} />
          
          <Route path='/admin-dashboard/add-department' element={< AddDepartment/>} />
          <Route path='/admin-dashboard/department/:id' element={< EditDepartment/>} />

          <Route path='/admin-dashboard/employees' element={< List/>} />
          <Route path='/admin-dashboard/add-employee' element={< Add/>} />
          <Route path='/admin-dashboard/employee/:id' element={< View/>} />
          <Route path='/admin-dashboard/employee/edit/:id' element={< Edit/>} />
          <Route path='/admin-dashboard/attendence' element={< AdminAttendence/>} />
          <Route path='/admin-dashboard/report' element={< AttendenceReport/>} />




        </Route>
        <Route 
        path="/employee-dashboard" 
        element={
          <PrivateRoutes>
            <RoleBasedRoute requiredRole={["admin",'employee']}>
              <EmployeeDashboard />
            </RoleBasedRoute>
            

          </PrivateRoutes>
        
       } >
        <Route index element={<Summary />} />
        <Route path="/employee-dashboard/profile/:id" element={< Profile/>} />
        <Route path="/employee-dashboard/attendence/:userId" element={< AttendenceList/>} />
        

       </Route>

       
       
      

      
      </Routes>
      
    
    </BrowserRouter>  
      
  )
}

export default App
