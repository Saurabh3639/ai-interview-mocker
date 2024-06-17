"use client";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));
    
      console.log(result);
      setInterviewList(result);
  };

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>

      <div className="grid grid-cols-1 md:grid-col-2 lg:grid-col-3 gap-5 my-3">
        {interviewList && interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
        ))}
      </div>
    </div>
  );
}

export default InterviewList;
