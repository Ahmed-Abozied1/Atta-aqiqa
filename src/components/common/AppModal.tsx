import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";
import { Cancel } from "../ui/icons/Cancel";

interface AppModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const AppModal = ({ isOpen, onClose, title, children, className }: AppModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                showCloseButton={false}
                dir="rtl"
                className={`
                  fixed! 
          left-1/2! 
          top-1/2! 
          -translate-x-1/2! 
          -translate-y-1/2!
          mx-auto!
          w-full
          max-w-200!
          sm:rounded-0!
          sm:h-screen
          max-h-[94vh]
          rounded-2xl!
          p-6 md:p-8!
          bg-bg
          border-0!
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-auto
                  ${className}
                `}
            >
                <div className="flex items-center justify-between mb-4">
                    {title && (
                        <h2 className="heading-5-bold text-title">
                            {title}
                        </h2>
                    )}

                    <DialogClose className="text-title cursor-pointer mr-auto">
                        <Cancel className="w-6 md:h-8 h-6 md:w-8" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </div>

                <DialogTitle className="sr-only">
                    {title || "Modal Dialog"}
                </DialogTitle>

                <div className="relative">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
};