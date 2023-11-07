"use client";

import { Transition, Dialog } from "@headlessui/react";
import {
  ArrowUpDown,
  Badge,
  Eye,
  List,
  ListChecks,
  Menu,
  Palette,
  PencilRuler,
  Settings,
  Table,
  X,
} from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import NavbarActions from "./NavbarActions";

interface MobileLayoutProps {
  routes: any[];
}

interface SidebarOption {}

const MobileLayout: FC<MobileLayoutProps> = ({ routes = [] }) => {
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();
  const pathname = usePathname();

  const routesFormatted = routes.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <Button onClick={() => setOpen(true)} className=''>
        <Menu className='h-4 w-4' />
      </Button>
      <Transition.Root show={open} as='div'>
        <Dialog
          as='div'
          className='relative z-[60] overflow-y-auto'
          onClose={setOpen}
        >
          <div className='fixed inset-0 overflow-y-auto' />

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='absolute inset-0 overflow-y-auto '>
              <div className='pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10  '>
                <Transition.Child
                  as='div'
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='-translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='-translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-[200px] overflow-y-auto  h-screen border-r-[1px] dark:border-r-slate-500 border-r-slate-900'>
                    <div className='flex h-full flex-col overflow-y-auto dark:bg-slate-950 bg-white py-6 shadow-xl'>
                      <div className='px-4 sm:px-6'>
                        <div className='flex items-start justify-between overflow-y-auto'>
                          <Dialog.Title className='w-[95%] absolute top-1 left-1 font-semibold leading-6 dark:text-white text-2xl bg-black text-white rounded-xl p-3 mr-5'>
                            Shoppy
                            <p className='text-xs'>Menu</p>
                            <div className='absolute right-1 top-1 ml-3 flex h-7 items-center'>
                              <button
                                type='button'
                                className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-nonetransition dark:bg-transparent '
                                onClick={() => setOpen(false)}
                              >
                                <span className='sr-only'>Close panel</span>
                                <X
                                  className='dark:white h-6 w-6'
                                  aria-hidden='true'
                                />
                              </button>
                            </div>
                          </Dialog.Title>
                        </div>
                      </div>
                      <div className='relative mt-20 flex-1 px-4 sm:px-6 text-black'>
                        {/* Content */}
                        <div className='flex flex-col items-start justify-center gap-y-5 overflow-y-auto'>
                          <nav
                            className={cn(
                              "flex flex-col items-start  space-y-4"
                            )}
                          >
                            {routesFormatted.map((route) => (
                              <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                  "text-sm font-medium transition-colors hover:text-black",
                                  route.active
                                    ? "text-black"
                                    : "text-neutral-500"
                                )}
                              >
                                {route.label}
                              </Link>
                            ))}
                          </nav>
                          <div className='max-sm:flex max-sm:flex-col hidden items-start justify-center gap-y-2'>
                            <h3 className='font-semibold'>Your cart</h3>
                            <NavbarActions />
                          </div>
                        </div>
                        {/* content end */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MobileLayout;
