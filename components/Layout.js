import Navbar from "./ui/Navbar";

export default function Layout({children}) {
    return (
<div>
  <Navbar />
<div className="main">{children}</div> 
</div> 
    )
}

