import { getActiveAnnouncements } from "@/lib/contentLoader";

export default function AnnouncementBar() {
  const announcements = getActiveAnnouncements();

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-warm-terra text-white py-2">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm">
          {announcements.map((announcement, index) => (
            <p key={index}>{announcement.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

