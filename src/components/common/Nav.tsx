// navigation component
import React, { Fragment } from 'react';
import AuthStatus from '../auth/AuthStatus';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    XMarkIcon,
    ArrowDownLeftIcon,
    CpuChipIcon,
} from '@heroicons/react/24/outline';

const Nav: React.FC = () => {
    const navItems = [
        {
            id: 2,
            name: 'Dashboard',
            path: '/dashboard',
        },
        {
            id: 3,
            name: 'Upload',
            path: '/upload',
        },
        {
            id: 4,
            name: 'Images',
            path: '/images',
        },
    ];

    return (
        <Disclosure as='nav'>
            {({ open }) => (
                <>
                    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                        <div className='relative flex h-16 items-center justify-between'>
                            <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                {/* Mobile menu button*/}
                                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                    <span className='sr-only'>
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className='block h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className='block h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                                <div className='flex flex-shrink-0 items-center'>
                                    <CpuChipIcon
                                        className='block h-8 w-auto lg:hidden'
                                        aria-hidden='true'
                                    />
                                    <CpuChipIcon
                                        className='hidden h-8 w-auto lg:block'
                                        aria-hidden='true'
                                    />
                                </div>
                                <div className='hidden sm:ml-6 sm:block'>
                                    <div className='flex space-x-4'>
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.id}
                                                to={item.path}
                                                aria-current={
                                                    item.name
                                                        ? 'page'
                                                        : undefined
                                                }
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                {/* Logout dropdown */}
                                <Menu as='div' className='relative ml-3'>
                                    <div>
                                        <Menu.Button className='flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                            <span className='sr-only'>
                                                Open user menu
                                            </span>
                                            <ArrowDownLeftIcon
                                                className='block h-6 w-6'
                                                aria-hidden='true'
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'
                                    >
                                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                            <Menu.Item>
                                                <AuthStatus />
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className='sm:hidden'>
                        <div className='space-y-1 px-2 pb-3 pt-2'>
                            {navItems.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as='a'
                                    href={item.path}
                                    aria-current={
                                        item.name ? 'page' : undefined
                                    }
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Nav;
