"use client";

import EventsList from "@/components/EventList";
import IsLoading from "@/components/IsLoading";
import Layout from "@/components/Layout";
import { Suspense } from "react";

export default function Events() {
  return (
    <>
      <Layout>
        <Suspense fallback={<IsLoading loading={true} />}>
          <EventsList status="published" />
        </Suspense>
      </Layout>
    </>
  );
}
