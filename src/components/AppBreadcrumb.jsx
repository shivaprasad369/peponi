import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split("/").reduce((prev, curr, index, array) => {
        const currentPathname = `${prev}/${curr}`;
        const routeName = getRouteName(currentPathname, routes) || curr || "Home"; // Fallback to `curr` or "Home"
        breadcrumbs.push({
            pathname: currentPathname,
            name: routeName,
            active: index + 1 === array.length, // Mark as active for the last breadcrumb
        });
        return currentPathname;
    }, ""); // Initial value of `prev` is an empty string
    return breadcrumbs[breadcrumbs.length-1];
};
  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/admin/account/dashboard">
      

      Home
    
      </CBreadcrumbItem>
      <span className='text-md capitalize flex items-center gap-1 font-semibold ml-2'>
        / {breadcrumbs.name}
      </span>
      {/* {breadcrumbs.name} */}
      {/* {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })} */}
      
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
