import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function UserProfileFloating() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating User Icon */}
      <button
        className="fixed bottom-6 left-6 z-50 bg-primary text-primary-foreground rounded-full shadow-lg w-14 h-14 flex items-center justify-center hover:bg-primary/90 transition-all border-4 border-background"
        onClick={() => setOpen(true)}
        aria-label="Open profile"
      >
        <User className="w-8 h-8" />
      </button>

      {/* Modal Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content className="max-w-md w-full p-6 rounded-2xl">
          <Dialog.Header>
            <Dialog.Title className="text-2xl font-bold mb-2 flex items-center gap-2">
              <User className="w-7 h-7 text-primary" /> My Profile
            </Dialog.Title>
          </Dialog.Header>
          <div className="space-y-2 text-base">
            <div><span className="font-semibold">Name:</span> Hari Krishna Anem</div>
            <div><span className="font-semibold">Phone:</span> <a href="tel:+919885699666" className="text-primary hover:underline">+91 9885699666</a></div>
            <div><span className="font-semibold">City:</span> Hyderabad, India</div>
            <div><span className="font-semibold">Email:</span> <a href="mailto:anemharikrishna@gmail.com" className="text-primary hover:underline">anemharikrishna@gmail.com</a></div>
            <div><span className="font-semibold">Degree:</span> B.Tech (CSIT)</div>
            <div><span className="font-semibold">GitHub:</span> <a href="https://github.com/HariKrishna-9885699666" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">HariKrishna-9885699666</a></div>
            <div><span className="font-semibold">LinkedIn:</span> <a href="https://linkedin.com/in/anemharikrishna" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">anemharikrishna</a></div>
            <div><span className="font-semibold">Blog:</span> <a href="https://anemharikrishna.hashnode.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hashnode</a></div>
            <div><span className="font-semibold">Portfolio:</span> <a href="https://harikrishna.netlify.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">harikrishna.netlify.app</a></div>
          </div>
          <Dialog.Footer className="mt-6 flex justify-end">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
