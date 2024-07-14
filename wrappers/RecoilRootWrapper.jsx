"use client";

import React from "react";
import { RecoilRoot } from "recoil";

function RecoilRootWrapper({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

export default RecoilRootWrapper;
