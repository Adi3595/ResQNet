class Tool:
    def __init__(self, name, func, description=""):
        self.name = name
        self.func = func
        self.description = description

class Agent:
    def __init__(self, name, role, goal, backstory, tools=None):
        self.name = name
        self.role = role
        self.goal = goal
        self.backstory = backstory
        self.tools = tools or []
        
    def execute(self, task):
        # In a real scenario, this would use google-genai to reason and call tools
        print(f"[{self.name}] Executing task: {task.description}")
        return f"Result from {self.name}"

class Task:
    def __init__(self, description, agent, context=None):
        self.description = description
        self.agent = agent
        self.context = context or []

class Team:
    def __init__(self, agents, tasks):
        self.agents = agents
        self.tasks = tasks
        
    def kickoff(self):
        results = []
        for task in self.tasks:
            res = task.agent.execute(task)
            results.append(res)
        return results
