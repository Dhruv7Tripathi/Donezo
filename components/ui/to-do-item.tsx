import React from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { CircleCheck, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onShowActions?: (id: number | null) => void;
  showActions?: number | null;
  className?: string;
}

export function TodoItem({
  todo,
  onComplete,
  onDelete,
  onShowActions,
  showActions,
  className
}: TodoItemProps) {
  const x = useMotionValue(0);

  return (
    <motion.div layout className={cn("flex min-h-7 items-center gap-2", className)}>
      <motion.button
        className="flex h-4 w-4 items-center justify-center rounded-sm border bg-secondary text-secondary-foreground"
        style={{ x }}
        onClick={() => {
          onComplete(todo.id);
          onShowActions?.(null);
        }}
      >
        {todo.completed && (
          <svg viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[8px]">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0 }}
              d="M2.25781 13.903L6.2995 27.8624C6.54178 28.6992 7.66377 28.8476 8.11527 28.1026L23.9323 2.00293"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        )}
      </motion.button>

      <motion.p
        animate={{ opacity: todo.completed ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative flex select-none items-center"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDrag={(e, info) => {
          if (showActions) onShowActions?.(null);
          x.set(decay(info.offset.x / 5, 30));
        }}
        onDragEnd={(e, info) => {
          if (info.offset.x > 50) {
            onComplete(todo.id);
          } else if (info.offset.x < -20 && !todo.completed) {
            onShowActions?.(todo.id);
          }
          animate(x, 0);
        }}
      >
        {todo.title}
        <AnimatePresence>
          {todo.completed && (
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 inline-block h-px bg-foreground"
            />
          )}
        </AnimatePresence>
      </motion.p>

      <AnimatePresence initial={false}>
        {showActions === todo.id && (
          <div className="ml-auto flex items-center gap-px">
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0 }}
              className="rounded-md p-1 transition-colors hover:bg-secondary"
              onClick={() => {
                onComplete(todo.id);
                onShowActions?.(null);
              }}
            >
              <CircleCheck size={20} />
            </motion.button>
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                bounce: 0,
                delay: showActions ? 0.05 : 0,
              }}
              className="rounded-md p-1 transition-colors hover:bg-secondary"
              onClick={() => {
                onDelete(todo.id);
                onShowActions?.(null);
              }}
            >
              <Trash size={20} />
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function decay(value: number, max: number) {
  let entry = value / max;
  let sigmoid = 2 / (1 + Math.exp(-entry)) - 1;
  return sigmoid * max;
}