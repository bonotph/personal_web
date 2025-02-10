import Link from 'next/link'

export default function Navbar(){
    return (
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link href = "/">Applications</Link>
          <ul className="p-2">
            <li><Link href = "/">Schedule App</Link></li>
            <li><Link href = "/">DND App</Link></li>
            <li><Link href = "/">Hike App</Link></li>
          </ul>
        </li>
        <li>
          <Link href = "/">Parent</Link>
          <ul className="p-2">
            <li><Link href = "/">Hong Kong</Link></li>
            <li><Link href = "/">UK</Link></li>
          </ul>
        </li>
        <li>
          <Link href = "/">Photography</Link>
          <ul className="p-2">
            <li><Link href = "/">photos</Link></li>
            <li><Link href = "/">vlogs</Link></li>
          </ul>
        </li>
      </ul>
    </div>
    <Link href = "/" className="btn btn-ghost text-xl">TOME</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className="flex">
                        <div className="flex items-center">
                            <Link href="/applications" className="px-4 py-2 hover:bg-base-200 rounded-l">Applications</Link>
                            <div className="dropdown dropdown-hover">
                                <label tabIndex={0} className="btn btn-ghost btn-xs px-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link href = "/">Schedule App</Link></li>
                                    <li><Link href = "/">DND App</Link></li>
                                    <li><Link href = "/">Hike App</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li className="flex">
                        <div className="flex items-center">
                            <Link href="/travel" className="px-4 py-2 hover:bg-base-200 rounded-l">Travel</Link>
                            <div className="dropdown dropdown-hover">
                                <label tabIndex={0} className="btn btn-ghost btn-xs px-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link href = "/">Hong Kong</Link></li>
                                    <li><Link href = "/travel/UK">UK</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li className="flex">
                        <div className="flex items-center">
                            <Link href="/photography" className="px-4 py-2 hover:bg-base-200 rounded-l">Photography</Link>
                            <div className="dropdown dropdown-hover">
                                <label tabIndex={0} className="btn btn-ghost btn-xs px-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link href = "/">photos</Link></li>
                                    <li><Link href = "/"> vlogs</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

  <div className="navbar-end mr-8">
    <button className="btn btn-ghost btn-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  </div>
</div>


    )
}

