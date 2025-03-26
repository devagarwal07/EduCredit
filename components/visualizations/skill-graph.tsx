"use client";

import { useEffect, useRef } from "react";
import { useMemo } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";
import { getRandomColor } from "@/lib/utils";

interface Skill {
  id: string;
  name: string;
  level: number;
  lastVerified: string;
  endorsements: number;
}

interface SkillGraphProps {
  skills: Skill[];
}

export function SkillGraph({ skills }: SkillGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Process the skills data for visualization
  const processedSkills = useMemo(() => {
    return skills.map((skill) => {
      const now = new Date();
      const lastVerified = new Date(skill.lastVerified);
      const daysSinceVerification = Math.floor(
        (now.getTime() - lastVerified.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Calculate a freshness score (0-1) where 1 is very fresh and 0 is over a year old
      const freshness = Math.max(0, 1 - daysSinceVerification / 365);

      return {
        ...skill,
        freshness,
        color: getRandomColor(skill.name),
        radius: 20 + skill.level / 10, // Size based on skill level
      };
    });
  }, [skills]);

  useEffect(() => {
    if (!svgRef.current || processedSkills.length === 0) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    // Create the simulation
    const simulation = d3
      .forceSimulation(processedSkills as d3.SimulationNodeDatum[])
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("charge", d3.forceManyBody().strength(5))
      .force(
        "collide",
        d3.forceCollide().radius((d: any) => d.radius + 5)
      );

    // Create the SVG elements
    const svg = d3.select(svgRef.current);

    // Create nodes
    const nodes = svg
      .selectAll(".node")
      .data(processedSkills)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${width / 2},${height / 2})`) // Start from center
      .call(
        d3
          .drag<SVGGElement, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Add circles for each node
    nodes
      .append("circle")
      .attr("r", (d: any) => d.radius)
      .attr("fill", (d: any) => d.color)
      .attr("opacity", (d: any) => 0.2 + d.freshness * 0.8) // Opacity based on freshness
      .attr("stroke", (d: any) => d3.color(d.color)?.darker().toString() || "")
      .attr("stroke-width", 1)
      .attr("class", "skill-node transition-all duration-300");

    // Add labels
    nodes
      .append("text")
      .text((d: any) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("fill", "currentColor")
      .attr("font-size", (d: any) => 10 + d.level / 20) // Size based on skill level
      .attr("pointer-events", "none"); // Don't interfere with drag

    // Add level indicators
    nodes
      .append("text")
      .text((d: any) => `${d.level}`)
      .attr("text-anchor", "middle")
      .attr("dy", "1.5em")
      .attr("fill", "currentColor")
      .attr("font-size", 10)
      .attr("font-weight", "bold")
      .attr("pointer-events", "none");

    // Update node positions on simulation tick
    simulation.on("tick", () => {
      nodes.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [processedSkills]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <svg ref={svgRef} width="100%" height="100%" />
    </motion.div>
  );
}
