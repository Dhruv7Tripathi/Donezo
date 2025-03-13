"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { CheckCircle, Circle, ArrowUpCircle } from 'lucide-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const [taskData, setTaskData] = useState({
    ToDo: 0,
    InProgress: 0,
    Done: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const [timeframeData, setTimeframeData] = useState([
    { name: 'Mon', ToDo: 0, InProgress: 0, Done: 0 },
    { name: 'Tue', ToDo: 0, InProgress: 0, Done: 0 },
    { name: 'Wed', ToDo: 0, InProgress: 0, Done: 0 },
    { name: 'Thu', ToDo: 0, InProgress: 0, Done: 0 },
    { name: 'Fri', ToDo: 0, InProgress: 0, Done: 0 },
    { name: 'Sat', ToDo: 0, InProgress: 0, Done: 0 },
    { name: 'Sun', ToDo: 0, InProgress: 0, Done: 0 }
  ]);

  // Fetch data from backend API
  useEffect(() => {
    const fetchData = async () => {
      if (status === 'loading') return;

      setIsLoading(true);
      setError(null);

      try {
        // Fixed template string syntax
        const response = await axios.get(`/api/todos/status/${session?.user?.id || ''}`);

        const { ToDo, InProgress, Done } = response.data;

        setTaskData({
          ToDo: ToDo || 0,
          InProgress: InProgress || 0,
          Done: Done || 0
        });

        // Sample time-based data - in a real app, you'd fetch this from another endpoint
        // or generate it from historical data
        setTimeframeData([
          { name: 'Mon', ToDo: ToDo * 0.2, InProgress: InProgress * 0.2, Done: Done * 0.1 },
          { name: 'Tue', ToDo: ToDo * 0.15, InProgress: InProgress * 0.3, Done: Done * 0.15 },
          { name: 'Wed', ToDo: ToDo * 0.1, InProgress: InProgress * 0.2, Done: Done * 0.2 },
          { name: 'Thu', ToDo: ToDo * 0.15, InProgress: InProgress * 0.1, Done: Done * 0.15 },
          { name: 'Fri', ToDo: ToDo * 0.2, InProgress: InProgress * 0.1, Done: Done * 0.1 },
          { name: 'Sat', ToDo: ToDo * 0.1, InProgress: InProgress * 0.05, Done: Done * 0.1 },
          { name: 'Sun', ToDo: ToDo * 0.1, InProgress: InProgress * 0.05, Done: Done * 0.2 }
        ].map(day => ({
          ...day,
          ToDo: Math.round(day.ToDo),
          InProgress: Math.round(day.InProgress),
          Done: Math.round(day.Done)
        })));
      } catch (err) {
        console.error('Error fetching task data:', err);
        setError("Failed to load task data. Please try again later.");

        // Set some dummy data for development purposes
        setTaskData({
          ToDo: 5,
          InProgress: 3,
          Done: 8
        });

        setTimeframeData([
          { name: 'Mon', ToDo: 1, InProgress: 1, Done: 1 },
          { name: 'Tue', ToDo: 1, InProgress: 2, Done: 1 },
          { name: 'Wed', ToDo: 1, InProgress: 1, Done: 2 },
          { name: 'Thu', ToDo: 1, InProgress: 1, Done: 1 },
          { name: 'Fri', ToDo: 1, InProgress: 1, Done: 1 },
          { name: 'Sat', ToDo: 0, InProgress: 0, Done: 1 },
          { name: 'Sun', ToDo: 0, InProgress: 0, Done: 1 }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session, status]); // Added dependencies to the effect

  const totalTasks = taskData.ToDo + taskData.InProgress + taskData.Done;
  const completionRate = totalTasks > 0 ? Math.round((taskData.Done / totalTasks) * 100) : 0;

  // Calculate last 7 days totals for pie chart
  const last7DaysTotals = timeframeData.reduce((acc, day) => {
    acc.ToDo += day.ToDo;
    acc.InProgress += day.InProgress;
    acc.Done += day.Done;
    return acc;
  }, { ToDo: 0, InProgress: 0, Done: 0 });

  const pieChartData = [
    { name: 'To Do', value: last7DaysTotals.ToDo, color: '#3b82f6' },
    { name: 'In Progress', value: last7DaysTotals.InProgress, color: '#f59e0b' },
    { name: 'Completed', value: last7DaysTotals.Done, color: '#10b981' }
  ];

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 rounded-lg">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">To Do Tasks</CardTitle>
            <Circle className="text-blue-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskData.ToDo}</div>
            <p className="text-xs text-gray-500">Pending tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <ArrowUpCircle className="text-amber-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskData.InProgress}</div>
            <p className="text-xs text-gray-500">Tasks being worked on</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle className="text-green-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskData.Done}</div>
            <p className="text-xs text-gray-500">Successfully completed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Completion</CardTitle>
          <CardDescription>Overall task completion rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tasks Distribution (Last 7 Days)</CardTitle>
            <CardDescription>Pie chart showing task status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week">
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>

              <TabsContent value="week" className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeframeData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ToDo" stackId="a" fill="#3b82f6" name="To Do" />
                    <Bar dataKey="InProgress" stackId="a" fill="#f59e0b" name="In Progress" />
                    <Bar dataKey="Done" stackId="a" fill="#10b981" name="Completed" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="month" className="mt-4">
                <div className="flex h-64 items-center justify-center">
                  <p className="text-sm text-gray-500">Month view would appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="year" className="mt-4">
                <div className="flex h-64 items-center justify-center">
                  <p className="text-sm text-gray-500">Year view would appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;