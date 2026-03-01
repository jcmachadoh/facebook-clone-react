import { Feed } from "../components/Feed"
import { LeftSidebar } from "../components/LeftSidebar"
import { RightSidebar } from "../components/RightSidebar"


export const Home = () => {
  return (
    <div className="flex justify-center pt-14 w-full">
      <LeftSidebar />
      <Feed />
      <RightSidebar />
    </div>
  )
}
