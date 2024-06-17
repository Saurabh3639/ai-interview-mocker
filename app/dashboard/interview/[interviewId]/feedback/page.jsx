"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Feedback({ params }) {
  const router = useRouter();

  const [feedbackList, setFeedbackList] = useState([]);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);
  };

  // Function to calculate average rating
  const calculateAverageRating = (data) => {
    const totalRating = data?.reduce((acc, curr) => acc + parseInt(curr.rating), 0);
    const averageRating = totalRating / data?.length;
    const roundedRating = Math.round(averageRating * 2) / 2;
    return roundedRating;
  }

  useEffect(() => {
    GetFeedback();
  }, []);

  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>

          <h2 className="text-2xl font-bold">
            Here is your interview feedback
          </h2>

          <h2 className="text-lg text-primary my-3">
            Your overall interview rating: <strong>{calculateAverageRating(feedbackList) || 0}/5</strong>
          </h2>

          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, your answer and
            feedback for improvement
          </h2>

          {feedbackList &&
            feedbackList?.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                  {item.question} <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating:</strong>
                      {item.rating}
                    </h2>
                    <h2 className="text-red-900 p-2 border rounded-lg bg-red-50 text-sm">
                      <strong>Your Answer:</strong>
                      {item.userAns}
                    </h2>
                    <h2 className="text-green-900 p-2 border rounded-lg bg-green-50 text-sm">
                      <strong>Correct Answer:</strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="text-primary p-2 border rounded-lg bg-blue-50 text-sm">
                      <strong>Feedback:</strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
}

export default Feedback;
