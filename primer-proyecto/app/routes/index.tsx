import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    window.location.href = `${window.location.href}landing-page`
  }, [])


  return (
    <div>HEROES PAGE</div>
  );
}
