
import React, { useState } from 'react';
import { Check, X, Plus, Pencil, X as Cross } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Rule } from '@/data/mockData';

interface RuleBuilderProps {
  rules: Rule[];
  onSaveRule?: (rule: Partial<Rule>) => void;
  onDeleteRule?: (ruleId: string) => void;
  onToggleRule?: (ruleId: string, enabled: boolean) => void;
  className?: string;
}

const RuleBuilder: React.FC<RuleBuilderProps> = ({
  rules,
  onSaveRule,
  onDeleteRule,
  onToggleRule,
  className,
}) => {
  const [editingRule, setEditingRule] = useState<Partial<Rule> | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreateRule = () => {
    setEditingRule({
      id: '',
      name: '',
      description: '',
      condition: '',
      action: 'FLAG_HIGH_RISK',
      priority: 1,
      enabled: true,
    });
    setShowForm(true);
  };

  const handleEditRule = (rule: Rule) => {
    setEditingRule({ ...rule });
    setShowForm(true);
  };

  const handleSaveRule = () => {
    if (editingRule && editingRule.name && editingRule.condition) {
      onSaveRule?.(editingRule);
      setEditingRule(null);
      setShowForm(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingRule(null);
    setShowForm(false);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Fraud Detection Rules</h2>
        <Button onClick={handleCreateRule} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Rule
        </Button>
      </div>

      {showForm && editingRule && (
        <Card className="mb-6 neo-blur animate-scale-in">
          <CardHeader>
            <CardTitle>{editingRule.id ? 'Edit Rule' : 'Create New Rule'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rule-name">Rule Name</Label>
                <Input
                  id="rule-name"
                  value={editingRule.name}
                  onChange={(e) => setEditingRule({ ...editingRule, name: e.target.value })}
                  placeholder="e.g., High Amount Transaction"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rule-description">Description</Label>
                <Textarea
                  id="rule-description"
                  value={editingRule.description}
                  onChange={(e) => setEditingRule({ ...editingRule, description: e.target.value })}
                  placeholder="Describe what this rule does"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rule-condition">Condition</Label>
                <Textarea
                  id="rule-condition"
                  value={editingRule.condition}
                  onChange={(e) => setEditingRule({ ...editingRule, condition: e.target.value })}
                  placeholder="e.g., amount > 10000"
                />
                <p className="text-xs text-muted-foreground">
                  Use conditions like "amount &gt; 10000", "country != 'US'", etc.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rule-action">Action</Label>
                <Select
                  value={editingRule.action}
                  onValueChange={(value) => setEditingRule({ ...editingRule, action: value })}
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
              <div className="grid gap-2">
                <Label htmlFor="rule-priority">Priority</Label>
                <Select
                  value={String(editingRule.priority)}
                  onValueChange={(value) => setEditingRule({ ...editingRule, priority: parseInt(value) })}
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
                <p className="text-xs text-muted-foreground">
                  Lower numbers have higher priority
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="rule-enabled"
                  checked={editingRule.enabled}
                  onCheckedChange={(checked) => setEditingRule({ ...editingRule, enabled: checked })}
                />
                <Label htmlFor="rule-enabled">Rule Enabled</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSaveRule}>
              Save Rule
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-3">
        {rules.map((rule) => (
          <Card
            key={rule.id}
            className={`hover-lift transition-all ${!rule.enabled ? 'opacity-60' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{rule.name}</h3>
                    <div className={`px-1.5 py-0.5 rounded-full text-xs ${
                      rule.priority === 0 ? 'bg-status-high/20 text-status-high' :
                      rule.priority === 1 ? 'bg-status-medium/20 text-status-medium-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      Priority {rule.priority}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`toggle-${rule.id}`}
                    checked={rule.enabled}
                    onCheckedChange={(checked) => onToggleRule?.(rule.id, checked)}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEditRule(rule)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => onDeleteRule?.(rule.id)}
                  >
                    <Cross className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Condition: </span>
                  <code className="bg-muted px-1 rounded">{rule.condition}</code>
                </div>
                <div>
                  <span className="text-muted-foreground">Action: </span>
                  <span className="font-medium">{rule.action.replace('_', ' ').toLowerCase()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RuleBuilder;
