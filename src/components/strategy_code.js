
export const stockCode = `from quartz_extensions.SignalManager.definition import *
class Compose(Factor):
    # 设置依赖的数据。支持 repo_id.factor_id/factor_id/uuid 三种格式
    dependencies = ['closePrice','openPrice']
    # 设置获取依赖数据的最大历史时间窗口长度
    max_history_window = 120
    # 因子定义函数，返回值类型要求是 pandas.Series 类型, index 是证券代码，value 是因子值
    def calculate(self):
        #通过cross_sectional函数可以获取多个因子的横截面值
        data = self.cross_sectional(['closePrice','openPrice'], date=self.get_current_date('%Y-%m-%d'))
        composed_factor=data.loc['closePrice']+data.loc['openPrice']
        return composed_factor
`;