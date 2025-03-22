
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RuleBuilder from '@/components/rules/RuleBuilder';
import DragDropRuleBuilder from '@/components/rules/DragDropRuleBuilder';
import { mockRules, Rule } from '@/data/mockData';
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Rules = () => {
  const [rules, setRules] = useState<Rule[]>(mockRules);
  const [selectedTab, setSelectedTab] = useState<string>("list");

  const handleSaveRule = (rule: Partial<Rule>) => {
    if (rule.id) {
      // Update existing rule
      setRules(prevRules =>
        prevRules.map(r => (r.id === rule.id ? { ...r, ...rule, updatedAt: new Date().toISOString() } as Rule : r))
      );
      toast.success(`Rule "${rule.name}" has been updated`);
    } else {
      // Create new rule
      const newRule: Rule = {
        ...rule as Omit<Rule, 'id' | 'createdAt' | 'updatedAt'>,
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setRules(prevRules => [...prevRules, newRule]);
      toast.success(`Rule "${rule.name}" has been created`);
    }
  };

  const handleDeleteRule = (ruleId: string) => {
    const ruleToDelete = rules.find(r => r.id === ruleId);
    if (!ruleToDelete) return;
    
    setRules(prevRules => prevRules.filter(r => r.id !== ruleId));
    toast.success(`Rule "${ruleToDelete.name}" has been deleted`);
  };

  const handleToggleRule = (ruleId: string, enabled: boolean) => {
    setRules(prevRules =>
      prevRules.map(r => (r.id === ruleId ? { ...r, enabled, updatedAt: new Date().toISOString() } : r))
    );
    
    const rule = rules.find(r => r.id === ruleId);
    if (rule) {
      toast.info(`Rule "${rule.name}" is now ${enabled ? 'enabled' : 'disabled'}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fraud Detection Rule Engine</h1>
          <p className="text-muted-foreground mt-2">
            Configure and manage rules to automatically detect fraudulent transactions
          </p>
        </div>
        
        <Tabs defaultValue="list" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="list">Rule List</TabsTrigger>
            <TabsTrigger value="visual-builder">Visual Rule Builder</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-6">
            <RuleBuilder
              rules={rules}
              onSaveRule={handleSaveRule}
              onDeleteRule={handleDeleteRule}
              onToggleRule={handleToggleRule}
            />
          </TabsContent>
          
          <TabsContent value="visual-builder" className="mt-6">
            <DragDropRuleBuilder onSaveRule={handleSaveRule} />
          </TabsContent>
        </Tabs>
        
      </div>
    </DashboardLayout>
  );
};

export default Rules;
