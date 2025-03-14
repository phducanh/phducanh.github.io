import React, { ReactNode } from 'react';
import { Popover as ShadcnPopover } from '@shadcn/ui';

interface PopoverProps {
  children: ReactNode;
  content: string;
}

const Popover = ({ children, content }: PopoverProps) => {
  return (
    <ShadcnPopover content={content}>
      {children}
    </ShadcnPopover>
  );
};

export default Popover; 