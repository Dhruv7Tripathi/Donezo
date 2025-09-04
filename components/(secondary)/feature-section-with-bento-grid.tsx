import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TodoList from "@/components/(secondary)/todo-items";
import FrameworkAgnostic from '@/components/framework-agnostic';
import GlassCard from "../glass-card";

export default function Feature() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Platform</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Something new!
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Managing a small business today is already tough.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>

              </div>
              <FrameworkAgnostic />
            </div>
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl aspect-square p-6 flex justify-between flex-col">
              <User className="w-8 h-8 stroke-1" />
              <TodoList />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Donezo: Your Task Companion</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Donezo helps you organize, track, and complete your daily tasks efficiently, so you can focus on what matters most.
                </p>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl aspect-square p-6 flex justify-between flex-col">
              <User className="w-8 h-8 stroke-1" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  Our goal is to streamline SMB trade, making it easier and faster
                  than ever.
                </p>
              </div>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
              <div className="flex h-[300px] w-full items-center justify-center bg-zinc-100 p-10 dark:bg-neutral-950">
                <GlassCard />
              </div>
              {/* <div className="flex flex-col">
                <p className="text-muted-foreground max-w-xs text-base">
                  Our goal is to streamline SMB trade, making it easier and faster
                  than ever.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

