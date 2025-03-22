import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, Plus, X, ArrowRight, Save } from 'lucide-react';
import { Rule } from '@/data/mockData';
import { toast } from "sonner";

interface DragDropRuleBuilderProps {
  onSaveRule?: (rule: Partial<Rule>) => void;
  className?: string;
}

type ConditionType = 'amount' | 'country' | 'time' | 'paymentMode' | 'channel' | 'custom';
type Operator = '>' | '<' | '=' | '!=' | 'contains' | 'startsWith' | 'endsWith';

interface ConditionBlock {
  id: string;
  type: ConditionType;
  operator: Operator;
  value: string;
  conjunction?: 'AND' | 'OR';
}

const DragDropRuleBuilder: React.FC<DragDropRuleBuilderProps> = ({ onSaveRule, className }) => {
  const [ruleName, setRuleName] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');
  const [ruleAction, setRuleAction] = useState<string>('FLAG_HIGH_RISK');
  const [rulePriority, setRulePriority] = useState<number>(1);
  const [conditions, setConditions] = useState<ConditionBlock[]>([
    { id: '1', type: 'amount', operator: '>', value: '10000', conjunction: 'AND' }
  ]);

  const handleAddCondition = () => {
    const newId = (Math.max(...conditions.map(c => parseInt(c.id)), 0) + 1).toString();
    setConditions([
      ...conditions,
      { id: newId, type: 'amount', operator: '>', value: '', conjunction: 'AND' }
    ]);
  };

  const handleRemoveCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const handleConditionChange = (id: string, field: keyof ConditionBlock, value: string) => {
    setConditions(conditions.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const buildConditionString = (): string => {
    return conditions.map((condition, index) => {
      let conditionStr = '';
      
      // Build the condition based on type
      switch (condition.type) {
        case 'amount':
          conditionStr = `amount ${condition.operator} ${condition.value}`;
          break;
        case 'country':
          conditionStr = `country ${condition.operator} '${condition.value}'`;
          break;
        case 'time':
          conditionStr = `timestamp ${condition.operator} '${condition.value}'`;
          break;
        case 'paymentMode':
          conditionStr = `paymentMode ${condition.operator} '${condition.value}'`;
          break;
        case 'channel':
          conditionStr = `channel ${condition.operator} '${condition.value}'`;
          break;
        case 'custom':
          conditionStr = condition.value;
          break;
      }
      
      // Add conjunction for all except the last one
      if (index < conditions.length - 1 && condition.conjunction) {
        conditionStr += ` ${condition.conjunction} `;
      }
      
      return conditionStr;
    }).join('');
  };

  const handleSaveRule = () => {
    if (!ruleName.trim()) {
      toast.error("Rule name is required");
      return;
    }
    
    if (conditions.length === 0) {
      toast.error("At least one condition is required");
      return;
    }
    
    const conditionString = buildConditionString();
    
    const newRule: Partial<Rule> = {
      name: ruleName,
      description: ruleDescription,
      condition: conditionString,
      action: ruleAction,
      priority: rulePriority,
      enabled: true
    };
    
    onSaveRule?.(newRule);
    
    // Reset form
    setRuleName('');
    setRuleDescription('');
    setRuleAction('FLAG_HIGH_RISK');
    setRulePriority(1);
    setConditions([{ id: '1', type: 'amount', operator: '>', value: '10000', conjunction: 'AND' }]);
    
    toast.success("Rule created successfully");
  };

  const handleTestRule = () => {
    const conditionString = buildConditionString();
    
    // This would be connected to a real testing endpoint in a production app
    toast.info("Testing rule against past transactions...", {
      description: `Condition: ${conditionString}`
    });
    
    // Simulate a delay and show results
    setTimeout(() => {
      toast.success("Rule test complete", {
        description: "5 transactions matched this rule criteria out of 100 tested transactions."
      });
    }, 1500);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Visual Rule Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rule-name">Rule Name</Label>
              <Input
                id="rule-name"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder="e.g., High Amount Transaction"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rule-action">Action</Label>
              <Select
                value={ruleAction}
                onValueChange={(value) => setRuleAction(value)}
              >
                <SelectTrigger id="rule-action">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FLAG_HIGH_RISK">Flag as High Risk</SelectItem>
                  <SelectItem value="FLAG_MEDIUM_RISK">Flag as Medium Risk</SelectItem>
                  <SelectItem value="BLOCK_TRANSACTION">Block Transaction</SelectItem>
                  <SelectItem value="REQUIRE_REVIEW">Require Manual Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rule-description">Description</Label>
            <Input
              id="rule-description"
              value={ruleDescription}
              onChange={(e) => setRuleDescription(e.target.value)}
              placeholder="Describe what this rule does"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rule-priority">Priority</Label>
            <Select
              value={String(rulePriority)}
              onValueChange={(value) => setRulePriority(parseInt(value))}
            >
              <SelectTrigger id="rule-priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 - Highest</SelectItem>
                <SelectItem value="1">1 - High</SelectItem>
                <SelectItem value="2">2 - Medium</SelectItem>
                <SelectItem value="3">3 - Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base">Conditions</Label>
            <Button variant="outline" size="sm" onClick={handleAddCondition} className="gap-1">
              <Plus className="h-3.5 w-3.5" />
              Add Condition
            </Button>
          </div>
          
          <div className="space-y-3">
            {conditions.map((condition, index) => (
              <div key={condition.id} className="flex flex-wrap items-center gap-2 p-3 border rounded-md bg-muted/30">
                <div className="flex-none">
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                </div>
                
                <div className="flex-grow flex flex-wrap gap-2">
                  <Select
                    value={condition.type}
                    onValueChange={(value) => handleConditionChange(condition.id, 'type', value as ConditionType)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amount">Amount</SelectItem>
                      <SelectItem value="country">Country</SelectItem>
                      <SelectItem value="time">Timestamp</SelectItem>
                      <SelectItem value="paymentMode">Payment Mode</SelectItem>
                      <SelectItem value="channel">Channel</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {condition.type !== 'custom' && (
                    <Select
                      value={condition.operator}
                      onValueChange={(value) => handleConditionChange(condition.id, 'operator', value as Operator)}
                    >
                      <SelectTrigger className="w-[110px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=">">greater than</SelectItem>
                        <SelectItem value="<">less than</SelectItem>
                        <SelectItem value="=">equals</SelectItem>
                        <SelectItem value="!=">not equals</SelectItem>
                        {condition.type !== 'amount' && (
                          <>
                            <SelectItem value="contains">contains</SelectItem>
                            <SelectItem value="startsWith">starts with</SelectItem>
                            <SelectItem value="endsWith">ends with</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                  
                  <Input
                    className={condition.type === 'custom' ? "flex-grow" : "w-[120px]"}
                    value={condition.value}
                    onChange={(e) => handleConditionChange(condition.id, 'value', e.target.value)}
                    placeholder={condition.type === 'custom' ? "custom expression" : "value"}
                  />
                  
                  {index < conditions.length - 1 && (
                    <Select
                      value={condition.conjunction}
                      onValueChange={(value) => handleConditionChange(condition.id, 'conjunction', value as 'AND' | 'OR')}
                    >
                      <SelectTrigger className="w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND">AND</SelectItem>
                        <SelectItem value="OR">OR</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveCondition(condition.id)}
                  disabled={conditions.length === 1}
                  className="flex-none h-8 w-8 text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border rounded-md bg-muted/20">
          <Label className="block mb-2">Rule Preview</Label>
          <div className="overflow-x-auto">
            <div className="font-mono bg-muted p-3 rounded text-sm whitespace-pre-wrap">
              {buildConditionString()}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleTestRule}>
            Test Rule
          </Button>
          <Button onClick={handleSaveRule} className="gap-1">
            <Save className="h-4 w-4" />
            Save Rule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DragDropRuleBuilder;
