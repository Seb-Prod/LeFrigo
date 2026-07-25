"use client";

import { useState } from "react";
import { Row, Surface, Tabs } from "@/components/ui";
import { COMPONENTS, type ComponentKey } from "./showcase.config";

export function ShowcasePage() {
  const [active, setActive] = useState<ComponentKey>("palettes");

  const tabs = Object.entries(COMPONENTS).map(([key, { label }]) => ({
    key: key as ComponentKey,
    label,
  }));

  const { Component } = COMPONENTS[active];

  return (
    <Surface fullScreen>
      <Row>
        <Tabs tabs={tabs} active={active} onChange={setActive} />
      </Row>
      <Component />
    </Surface>
  );
}