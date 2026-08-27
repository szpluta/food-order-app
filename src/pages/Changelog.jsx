import ChangelogItem from "../components/ChangelogItem";
import video from "../assets/v1.0-demo.mp4";

function Changelog() {
  return (
    <div className="space-y-5">
      <h2 className="py-3.75 px-7 border-b border-b-(--border) mb-10">
        Changelog
      </h2>
      <ChangelogItem version="1.2" codename="TORTILLA">
        <ul className="list-disc ps-10">
          <li>User authentication</li>
          <li>Login and logout flow</li>
          <li>Session handling and token refresh</li>
          <li>Protected user orders</li>
          <li>Order history</li>
        </ul>
      </ChangelogItem>
      <ChangelogItem version="1.1" codename="LASAGNA">
        <ul className="list-disc ps-10">
          <li>React Router implementation</li>
          <li>Content refactor</li>
          <li>Added custom styles and animations</li>
        </ul>
      </ChangelogItem>
      <ChangelogItem version="1.0" codename="PASTA">
        <ul className="list-disc ps-10">
          <li>Initial release</li>
          <li>Checkout flow in dialog</li>
          <li>Supabase integration</li>
        </ul>
        <p>v1.0 demo:</p>
        <video controls className="w-150 max-w-full rounded-md mx-auto">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </ChangelogItem>
    </div>
  );
}

export default Changelog;
