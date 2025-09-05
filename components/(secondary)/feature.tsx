import { Badge } from "@/components/ui/badge";
import TodoList from "@/components/(secondary)/todo-items";
import FrameworkAgnostic from '@/components/framework-agnostic';
import GlassCard from "../glass-card";
import { Beams } from "./beams";
export default function Feature() {
  return (
    <div className="w-full py-20 lg:py-20">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex justify-center items-center gap-4 flex-col">
            <div>
              <Badge className="font-semibold text-neutral-500">Platform</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="bg-gradient-stop mx-auto max-w-6xl text-balance bg-gradient-to-br from-neutral-800 via-neutral-800 to-neutral-900/30 dark:from-neutral-100 dark:via-neutral-100 via-50% dark:to-neutral-100/30 bg-clip-text py-2 px-2 text-6xl font-semibold leading-[1.1] tracking-tighter text-transparent md:text-6xl lg:text-6xl">
                Try Something New
              </h2>
              {/* <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                Managing a small business today is already tough.
              </p> */}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">Donezo: Simplifying Task Management</h3>

              </div>
              <FrameworkAgnostic />

            </div>
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl aspect-square p-6 flex justify-between flex-col">
              <h3 className="text-xl tracking-tight">Donezo: Your Task Companion</h3>
              <TodoList />
              <div className="flex flex-col">
                <p className="text-muted-foreground max-w-xs text-base">
                  Donezo helps you organize, track, and complete your daily tasks efficiently, so you can focus on what matters most.
                </p>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl aspect-square p-6 flex justify-between flex-col">
              <h3 className="text-xl tracking-tight">Organize. Achieve. Repeat.</h3>
              {/* <p className="text-muted-foreground max-w-xs text-base">
                Donezo transforms your daily routine by making task management simple and intuitive, so you can accomplish more with less effort.
                </p> */}
              <div className="flex h-[300px] w-full items-center justify-center bg-zinc-100 p-10 dark:bg-neutral-950">
                <GlassCard />
              </div>
              <div className="flex flex-col">
                {/* <h3 className="text-xl tracking-tight">Pay supplier invoices</h3> */}
                {/* <p className="text-muted-foreground max-w-xs text-base">
                  Our goal is to streamline SMB trade, making it easier and faster
                  than ever.
                  </p> */}
              </div>
            </div>
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
              <h3 className="text-xl tracking-tight">Donezo: Empower Your Productivity</h3>

              {/* <p className="text-muted-foreground max-w-xs text-base">
                Donezo is designed to help you stay organized, prioritize tasks, and achieve your goals with ease. Experience a smarter way to manage your daily workflow.
                </p> */}
              <Beams />
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

